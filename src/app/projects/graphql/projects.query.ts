import {gql, Query} from 'apollo-angular';
import {Injectable} from '@angular/core';
import {ProjectInterface} from '../types/project.interface';

@Injectable()
export class ProjectsQuery extends Query<{projects: ProjectInterface[]}> {
    override document = gql`
        query projects($ids: [ID!], $administratorId: ID) {
            projects(ids: $ids, administratorId: $administratorId) {
                id
                name
                users {
                    fullName
                }
                tasks {
                    id
                    title
                    body
                    deadlineDate
                    createdAt
                    author {
                        fullName
                    }
                    executor {
                        fullName
                    }
                }
            }
        }
    `;
}
