import {gql, Query} from 'apollo-angular';
import {TaskInterface} from '../types/task.interface';

export class ByIdTasksQuery extends Query<{tasks: TaskInterface[]}> {
    override document = gql`
        query tasksById($ids: [ID!]) {
            tasks(ids: $ids) {
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
