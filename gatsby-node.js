const path = require('path');

exports.createPages = ({graphql,actions}) => {
    const {createPage} = actions;
    const albumTemplate = path.resolve('src/components/albumTemplate.js');

    return graphql(`query MyQuery {
        allAlbum {
          edges {
            node {
              id
              summary
              title
              image
              artist {
                name
              }
            }
          }
        }
      }`).then((result) => {
          if(result.errors){throw result.errors}
          result.data.allAlbum.edges.forEach(album => {
              createPage({
                  path: `/album/${album.node.id}`,
                  component: albumTemplate,
                  context: album.node
              })
          })
      })
}