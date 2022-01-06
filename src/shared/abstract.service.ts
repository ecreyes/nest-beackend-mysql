import { DeleteResult, Repository, UpdateResult } from 'typeorm'

export abstract class AbstractService<T> {
    constructor(protected repository: Repository<T>) {}

    public save(options: any): Promise<T> {
        return this.repository.save(options)
    }

    public findOne(options: any): Promise<T> {
        return this.repository.findOne(options)
    }

    public find(options: any): Promise<T[]> {
        return this.repository.find(options)
    }

    public update(id, options): Promise<UpdateResult> {
        return this.repository.update(id, options)
    }

    public delete(id): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}
