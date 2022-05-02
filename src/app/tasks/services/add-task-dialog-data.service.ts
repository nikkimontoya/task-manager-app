import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map, Observable, of, tap} from 'rxjs';
import {AddTaskDialogDataInterface} from '../types/add-task-dialog-data.interface';

@Injectable()
export class AddTaskDialogDataService {
    data: AddTaskDialogDataInterface = null;

    constructor(private apollo: Apollo) {}

    /**
     * Caches data for add task dialog after first request
     */
    getData(): Observable<AddTaskDialogDataInterface> {
        if (this.data) {
            return of(this.data);
        }

        return this.apollo
            .query<AddTaskDialogDataInterface>({
                query: gql`
                    {
                        projects {
                            id
                            name
                        }
                        users {
                            id
                            fullName
                        }
                    }
                `
            })
            .pipe(
                map((result) => result.data),
                tap((data) => (this.data = data))
            );
    }
}
