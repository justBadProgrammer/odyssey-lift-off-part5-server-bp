const resolvers = {
  Query: 
    {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_parent, _args, { dataSources }, _info) =>
      dataSources.trackAPI.getTracksForHome(),

    // get a single track by ID, for the track page
    track: (_parent, { id }, { dataSources }, _info) => dataSources.trackAPI.getTrack(id),

    // get a single module by ID, for the module detail page
    module: (_parent, { id }, { dataSources },_info) => dataSources.trackAPI.getModule(id)
  },
  Mutation: 
    {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: 
    {
      author: ({ authorId }, _args, { dataSources }, _info) => 
        dataSources.trackAPI.getAuthor(authorId),
      modules: ({ id }, _args, { dataSources }, _info) => 
        dataSources.trackAPI.getTrackModules(id),
      durationInSeconds: ({length}, _args, _context, _info) => length,  
    },
  Module:
    {
      durationInSeconds: ({length}, _args, _context, _info) => length,
      track: ({trackId}, _args, { dataSources }, _info) => dataSources.trackAPI.getTrack(trackId),
    }  
};

module.exports = resolvers;
