export class Show {
    constructor(
        private id: string,
        private weekDay: WeekDay,
        private bandId: string,
        private startTime: number,
        private endTime: number
    ) { }

    getId() {
        return this.id;
    }

    getWeekDay() {
        return this.weekDay
    }

    getBandId() {
        return this.bandId;
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }

    setId(id: string) {
        this.id = id;
    }

    setWeekDay(weekDay: WeekDay) {
        this.weekDay = weekDay;
    }

    setBandId(bandId: string) {
        this.bandId = bandId;
    }

    setStartTime(startTime: number) {
        this.startTime = startTime;
    }

    setEndTime(endTime: number) {
        this.endTime = endTime;
    }

    public static toWeekDay(data?: any): WeekDay {
        switch (data) {
            case "FRIDAY":
                return WeekDay.FRIDAY
            case "SATURDAY":
                return WeekDay.SATURDAY
            case "SUNDAY":
                return WeekDay.SUNDAY
            default:
                throw new Error("Invalid weekDay , just 'FRIDAY' or 'SATURDAY' or 'SUNDAY'")
        }
    }

    public static toShowModel(data?: any) {
        return (data && new Show(
            data.id,
            Show.toWeekDay(data.weekDay || data.week_day),
            data.bandId,
            data.startTime,
            data.endTime
        ))
    }

}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"

}

export interface showInputDTO {
    bandId: string;
    weekDay: WeekDay;
    startTime: number;
    endTime: number;
}

export interface showOutputDTO {
    id: string;
    bandId: string;
    weekDay: WeekDay;
    startTime: number;
    endTime: number;
}