import React from "react";
import Movie from "./Movie";

class Movies extends React.Component {
    render() {
        console.log(this.props.movieInfo);
        return (
            <>
                <h2>Movies:</h2>
                <ul>
                    {this.props.movieInfo.map((item, idx) => {
                        return (
                            <Movie
                                key={idx}
                                title={item.title}
                                overview={item.overview}
                                average_votes={item.average_votes}
                                total_votes={item.total_votes}
                                image={item.image_url}
                                popularity={item.popularity}
                                released_on={item.released_on}
                            />
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default Movies;