import {expect} from "chai";
import request from "supertest";
import {app} from "../app";
import {pushMoviesToDb, pushCommentsToDb, movies, comments} from "./seeds/seed";
import CommentModel from "../entities/Comment/CommentModel";

const expressApp = app.app;

describe("Comments controllers tests", () => {
    beforeEach(pushMoviesToDb);
    beforeEach(pushCommentsToDb);

    it('Should add comment to the database', (done) => {
        const commentBody = {
            email: "testExample1@example.com",
            body: "Lorem ipsum",
            movieId: movies[1]._id
        }

        request(expressApp)
            .post('/api/v1/comments')
            .send(commentBody)
            .expect(201)
            .expect((res) => {
                expect(res.body.comment.movieId).to.equal(commentBody.movieId);
                expect(res.body.comment.email).to.equal(commentBody.email);
                expect(res.body.comment.body).to.equal(commentBody.body);
                expect(res.body.comment).to.have.property("date");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                CommentModel.find({email: commentBody.email, body: commentBody.body, movieId: commentBody.movieId})
                    .then((comments) => {
                        expect(comments.length).to.have.length(1);
                        done();
                    }).catch(() => {
                    done();
                });
            });
    });

    it("Should get comment by id", (done) => {
        request(expressApp)
            .get(`/api/v1/comments/${comments[0]._id}`)
            .expect(200)
            .expect(res => {

                const commentEmailSuffix = comments[0].email.substring(comments[0].email.length - 6, comments[0].email.length);
                const commentEmailPrefix = comments[0].email.substring(0, comments[0].email.length - 6).replace(/./gi, "*");

                expect(res.body.comment.movieId).to.equal(comments[0].movieId);
                expect(res.body.comment.email).to.equal(commentEmailPrefix + commentEmailSuffix);
                expect(res.body.comment.body).to.equal(comments[0].body);
                expect(res.body.comment).to.have.property("date");
                expect(res.body.comment.associatedMovie.title).to.equal(movies[0].title);
                expect(res.body.comment.associatedMovie.year).to.equal(movies[0].year);
            }).end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        })
    });

    it("Should get comment associated with movie", (done) => {
        request(expressApp)
            .get(`/api/v1/comments/?movieId=${movies[0]._id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.count).to.equal(2);

                const results = res.body.results.map((comment: any) => {
                    const parsedData = {...comment};
                    delete parsedData.__v;
                    return parsedData;
                })

                expect(results).to.eql(comments);
            })
            .end(((err, res) => {
                if (err) {
                    return done(err);
                }

                done();
            }));
    });
});