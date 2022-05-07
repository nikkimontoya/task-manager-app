import {gql, Mutation} from 'apollo-angular';
import {TaskInterface} from '../types/task.interface';

export class EditTaskMutation extends Mutation<TaskInterface> {
    override document = gql`
        mutation editTask($id: ID!, $task: TaskInput!) {
            editTask(id: $id, task: $task) {
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
