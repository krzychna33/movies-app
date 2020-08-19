import { IsString, IsEmail } from 'class-validator';

class AddCommentDto {
    @IsEmail()
    public email: string;

    @IsString()
    public body: number;

    @IsString()
    public movieId: string;
}

export default AddCommentDto;