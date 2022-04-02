import {TaskInterface} from '../types/task.interface';
import {UserInterface} from '../../shared/types/user.interface';
import {ProjectInterface} from '../../projects/types/project.interface';

export class TaskDto {
    data: TaskInterface;
    included: {
        users: UserInterface[];
        projects: ProjectInterface[];
    };
}
