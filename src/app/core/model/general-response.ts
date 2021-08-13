export class GeneralResponse<T> {

    private _data: T;
    private _message: string;
    private _success: boolean;


    constructor(data: T, message: string, success: boolean) {
        this._data = data;
        this._message = message;
        this._success = success;
    }

    public get data(): T {
        return this._data;
    }
    public set data(value: T) {
        this._data = value;
    }

    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public get success(): boolean {
        return this._success;
    }
    public set success(value: boolean) {
        this._success = value;
    }
}