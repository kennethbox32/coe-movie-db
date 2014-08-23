$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = '1c7e86d3b599571ee5e647843d09b957';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: '1c7e86d3b599571ee5e647843d09b957'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.btn-now-showing').click(function() {
            loadNowShowing();
            return  false;
        });
               
        $('.btn-upcoming').click(function() {
            loadUpcoming();
            return  false;
        });

        $('.btn-popular').click(function() {
            loadPopular();
            return  false;
        });

        $('.btn-top-rated').click(function() {
            loadTopRated();
            return  false;
        });

        loadNowShowing();
    }

    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function displayMovies(data) {
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[4] + movie.poster_path;
            var htmlStr = [
                            '<div class="col-md-4 portfolio-item">',
                                '<a href="#">',
                                    '<img class="img-responsive" src="' + imageSrc + '" alt="" style = "width: 500; height: 500;">',
                                '</a>',
                                '<h3>',
                                    '<a href="#">' + movie.title +'</a>',
                                '</h3>',
                            '</div>'
                            ];
            $('.movies-list').append($(htmlStr.join('')));
        });
    }

    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function loadUpcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function loadTopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
   
    initialize(setEventHandlers);
});
