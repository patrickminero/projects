let api = {
    id: 'M76o7gP93LHAg3rZcV-zPQ',
    key: 'bcOSGB83uf0uCndOyUKZr6cxNmkPFalrBdW1Ll2juBdEESRxSaoRqQ1HXQqbKmcGf0A67wL4Vf_wvzUuCGyGwcGViDCwX745WCxvRUdX7D2vA2f7sQ_11F6Ia9t9X3Yx'
}

const Yelp = {
    search(term, location, sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {headers: {Authorization: `Bearer ${api.key}`}})
    .then((response) => {
        return response.json();
    }).then((jsonResponse)=>{
        if(jsonResponse.businesses){
            return jsonResponse.businesses.map((business)=> ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
            }))
        }
    })
    }
    
}

export default Yelp;