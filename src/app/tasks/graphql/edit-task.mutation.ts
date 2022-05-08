import {gql, Mutation} from 'apollo-angular';
import {TaskInterface} from '../types/task.interface';

export class EditTaskMutation extends Mutation<{editTask: TaskInterface}> {
    override document = gql`
        mutation editTask($id: ID!, $task: TaskInput!) {
            editTask(id: $id, task: $task) {
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
