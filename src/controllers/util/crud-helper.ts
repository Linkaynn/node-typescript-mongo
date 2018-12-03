import {ModelPopulateOptions, Query} from "mongoose";
import {CustomException} from "../errors/custom-exception";

export class CrudHelper {
  CRUD;

  constructor(_CRUD) {
    this.CRUD = _CRUD;
  }

  /**
   * Insert the document or update it, depending if it has an _id
   * @param _doc
   * @param populationOptions
   */
  public async insertOrUpdate(_doc, populationOptions?: ModelPopulateOptions) {
    const onRejected = (res) => {
      error = res;
    };

    let error = null;
    let id = null;

    if (_doc._id) {
      id = _doc._id;
      _doc.updatedDate = new Date();

      await this.CRUD
        .updateOne({_id: _doc._id}, _doc, {upsert: true})
        .catch(onRejected);
    } else {
      _doc.createdDate = new Date();
      _doc.updatedDate = new Date();

      const docInserted = await new this.CRUD(_doc)
        .save()
        .catch(onRejected);

      if (docInserted) {
        id = docInserted._id;
      }
    }

    if (error) {
      throw new CustomException('db/database-error', error);
    }

    return (await (populationOptions ? this.CRUD.findById(id).populate(populationOptions).catch(onRejected) : this.CRUD.findById(id).catch(onRejected)))._doc;
  }

  /**
   * Insert the document
   * @param _doc
   * @param populationOptions
   */
  public async insert(_doc) {
    const onRejected = (res) => {
      error = res;
    };

    let error = null;

    _doc.createdDate = new Date();
    _doc.updatedDate = new Date();

    const result = await new this.CRUD(_doc)
      .save()
      .catch(onRejected);

    if (error) {
      throw new CustomException('db/database-error', error);
    }

    return result;
  }

  /**
   * Update a document
   */
  public async update(id, data) {
    const onRejected = (res) => {
      error = res;
    };

    let error = null;

    data.updatedDate = new Date();

    await this.CRUD
      .updateOne({_id: id}, data, {upsert: true})
      .catch(onRejected);


    if (error) {
      throw new CustomException('db/database-error', error);
    }

    return (await this.CRUD.findById(id).catch(onRejected))._doc;
  }

  /**
   * Find all the documents and return it all
   * @param query
   * @param populationOptions
   */
  public async findAll(query, populationOptions?: ModelPopulateOptions) {
    const onRejected = (res) => {
      error = res;
    };

    let error = null;

    const documents = (
      await (
        populationOptions ?
          this.CRUD.find(query).populate(populationOptions).exec()
          :
          this.CRUD.find(query).catch(onRejected)
      )
    ).map((element) => element._doc);

    if (error) {
      throw new CustomException('db/database-error', error);
    }

    for (const document of documents) {
      delete document.__v;
    }

    return documents;

  }

  public delete(id) {
    return this.CRUD.findOneAndDelete(id);
  }

  /**
   * Return the number of documents
   */
  public count(condition = {}) : Query<number> {
    return this.CRUD.countDocuments({});
  }

  /**
   * Wrapper of findOne of mongoose
   * @param conditions
   */
  public findOne(condition = {}) {
    return this.CRUD.findOne(condition);
  }
}
