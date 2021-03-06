import {gql, Query} from 'apollo-angular';
import {TaskInterface} from '../types/task.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class AllTasksQuery extends Query<{tasks: TaskInterface[]}> {
    override document = gql`
        query allTasks {
            tasks {
                id
                title
                body
                deadlineDate
                createdAt
                author {
                    id
                    fullName
                }
                executor {
                    id
                    fullName
                }
                project {
                    id
                    name
                }
            }
        }
    `;
}
