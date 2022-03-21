export interface ProjectInterface {
    id: number;
    name: string;
    taskIds: number[];
    participantIds: number[];
    administratorId: number;
    createdAt: Date;
    updatedAt: Date;
}
