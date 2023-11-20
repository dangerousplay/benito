import {ApiProperty} from "@nestjs/swagger";

export class NeedImageUpload {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
