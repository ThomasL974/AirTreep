import { User } from "src/entities/user/entities/user.entity";
export declare class CreateTravelDto {
    title: string;
    country: string;
    activityType: string;
    city: string;
    difficulty: number;
    description: string;
    unityTime: number;
    time: number;
    startLocation: string;
    arrivalLocation: string;
    latitudeStart: number;
    longitudeStart: number;
    userId: User;
}
