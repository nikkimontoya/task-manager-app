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
                    firstName
                    lastName
                }
                executor {
                    firstName
                    lastName
                }
                project {
                    id
                    name
                }
            }
        }
    `;
}
