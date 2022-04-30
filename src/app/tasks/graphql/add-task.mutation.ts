import {gql, Mutation} from 'apollo-angular';
import {TaskInterface} from '../types/task.interface';

export class AddTaskMutation extends Mutation<TaskInterface> {
    override document = gql`
        mutation addTask($task: TaskInput!) {
            addTask(task: $task) {
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
