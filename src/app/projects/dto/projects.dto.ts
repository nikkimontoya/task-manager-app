import {ProjectInterface} from '../types/project.interface';
import {UserInterface} from '../../shared/types/user.interface';

export class ProjectsDto {
    data: ProjectInterface[];
    included: {
        users: UserInterface[];
    };
}
