import {expect} from "chai";
import request from "supertest";
import {app} from "../app";
import AddMovieDto from "../entities/Movie/AddMovieDto";
import MovieModel from "../entities/Movie/MovieModel";
import {movies, pushMoviesToDb} from "./seeds/seed";

const expressApp = app.app;

describe("Movies Controller tests", () => {

    beforeEach(pushMoviesToDb);

    it("Should add new movie with no details", (done) => {
        const movieBody: AddMovieDto = {
            title: "My custom movie",
            year: 2100
        };

        request(expressApp)
            .post('/api/v1/movies')
            .send(movieBody)
            .expect(201)
            .expect((res) => {
                expect(res.body.movie.title).to.equal(movieBody.title);
                expect(res.body.movie).to.not.have.property("details");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                MovieModel.find({title: movieBody.title, year: movieBody.title})
                    .then((movies) => {
                        expect(movies.length).to.equal(1);
                        done();
                    })
                    .catch(() => {
                        done();
                    });
            });
    });

    it("Should add new movie with details", (done) => {
        const movieBody: AddMovieDto = {
            title: "Shrek",
            year: 2001
        };

        request(expressApp)
            .post('/api/v1/movies')
            .send(movieBody)
            .expect(201)
            .expect((res) => {
                expect(res.body.movie.title).to.equal(movieBody.title);
                expect(res.body.movie).to.have.property("details");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                MovieModel.find({title: movieBody.title, year: movieBody.title})
                    .then((movies) => {
                        expect(movies.length).to.equal(1);
                        done();
                    })
                    .catch(() => {
                        done();
                    });
            });
    });

    it("Should list all movies", (done) => {
        request(expressApp)
            .get('/api/v1/movies')
            .expect(200)
            .expect(res => {
                expect(res.body.count).to.equal(movies.length)
                expect(res.body.results).to.have.length(movies.length);
                expect(res.body.results[0].title).to.equal(movies[0].title);
                expect(res.body.results[1].title).to.equal(movies[1].title);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    });

    it("Should get 1st movie by id", (done) => {
        request(expressApp)
            .get(`/api/v1/movies/${movies[0]._id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.movie.title).to.equal(movies[0].title);
                expect(res.body.movie.title).to.equal(movies[0].title);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    });

})