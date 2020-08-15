import { IsString, IsInt, Min } from 'class-validator';

class AddMovieDto {
    @IsString()
    public title: string;

    @IsInt()
    @Min(1900)
    public year: number;
}

export default AddMovieDto;