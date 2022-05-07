import {UserInterface} from '../../user/types/user.interface';
import {ProjectInterface} from '../../projects/types/project.interface';

export interface TaskInterface {
    id: number;
    title: string;
    body: string;
    deadlineDate: Date;
    author?: UserInterface;
    executor?: UserInterface;
    project?: ProjectInterface;
    createdAt: Date;
}
