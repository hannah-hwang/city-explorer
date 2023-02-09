import React from "react";

class Movies extends React.Component {
    render() {
        console.log(this.props.movieInfo);
        return (
            <>
                <ul>
                    {this.props.movieInfo.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <p>{item.title}</p>
                                <p>{item.overview}</p>
                                <p>{item.average_votes}</p>
                                <p>{item.total_votes}</p>
                                <p>{item.image_url}</p>
                                <p>{item.popularity}</p>
                                <p>{item.released_on}</p>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default Movies;