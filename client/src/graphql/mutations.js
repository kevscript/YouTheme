import gql from 'graphql-tag'

export const CREATE_THEME = gql`
  mutation CreateTheme($id: String!, $themeName: String!) {
    createTheme(id: $id, themeName: $themeName) {
      id
      name
      channels {
        channelId
        channelName
      }
    }
  }
`

export const DELETE_THEME = gql`
  mutation DeleteTheme($id: String!, $themeId: String!) {
    deleteTheme(id: $id, themeId: $themeId) {
      id
      name
      channels {
        channelId
        channelName
      }
    }
  }
`

export const EDIT_THEME_NAME = gql`
  mutation EditThemeName($id: String!, $themeId: String!) {
    editThemeName(id: $id, themeId: $themeId) {
      id
      name
      channels {
        channelId
        channelName
      }
    }
  }
`

export const ADD_CHANNEL = gql`
  mutation AddChannel($id: String!, $themeId: String!, $channelId: String!, $channelName: String!) {
    addChannel(id: $id, themeId: $themeId, channelId: $channelId, channelName: $channelName) {
      id
      name
      channels {
        channelId
        channelName
      }
    }
  }
`

export const REMOVE_CHANNEL = gql`
  mutation RemoveChannel($id: String!, $themeId: String!, $channelId: String!) {
    removeChannel(id: $id, themeId: $themeId, channelId: $channelId) {
      id
      name
      channels {
        channelId
        channelName
      }
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($idToken: String!, $accessToken: String!) {
    register(idToken: $idToken, accessToken: $accessToken) {
      name
      email
      id
      createdAt
      subscriptions {
        kind
        etag
        id
        snippet {
          publishedAt
          title
          description
          channelId
          resourceId {
            kind
            channelId
          }
          thumbnails {
            default {
              url
            }
            medium {
              url
            }
            high {
              url
            }
          }
        }
        contentDetails {
          totalItemCount
          newItemCount
          activityType
        }
      }
      themes {
        name
        id
        channels {
          channelId
          channelName
        }
      }
    }
  }
`

export const RELOAD_SUBS = gql`
  mutation ReloadSubs($id: String!, $accessToken: String!) {
    reloadSubs(id: $id, accessToken: $accessToken) {
      kind
      etag
      id
      snippet {
        publishedAt
        title
        description
        channelId
        resourceId {
          kind
          channelId
        }
        thumbnails {
          default {
            url
          }
          medium {
            url
          }
          high {
            url
          }
        }
      }
      contentDetails {
        totalItemCount
        newItemCount
        activityType
      }
    }
  }
`