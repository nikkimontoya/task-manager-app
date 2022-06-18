import {gql, Mutation} from 'apollo-angular';
import {ProjectInterface} from '../types/project.interface';

export class CreateProjectMutation extends Mutation<{createProject: ProjectInterface}> {
    override document = gql`
        mutation EditProject($project: CreateProjectInput!) {
            createProject(project: $project) {
                id
                name
                description
            }
        }
    `;
}
