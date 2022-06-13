import {gql, Mutation} from 'apollo-angular';
import {ProjectInterface} from '../types/project.interface';

export class EditProjectMutation extends Mutation<{editProject: ProjectInterface}> {
    override document = gql`
        mutation EditProject($id: ID!, $project: ProjectInput!) {
            editProject(id: $id, project: $project) {
                name
                description
            }
        }
    `;
}
