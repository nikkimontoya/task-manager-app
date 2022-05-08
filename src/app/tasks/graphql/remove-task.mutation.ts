import {gql, Mutation} from 'apollo-angular';
import {RemoveTaskResultInterface} from '../types/remove-task-result.interface';

export class RemoveTaskMutation extends Mutation<{removeTask: RemoveTaskResultInterface}> {
    override document = gql`
        mutation removeTask($id: ID!) {
            removeTask(id: $id) {
                successful
            }
        }
    `;
}
