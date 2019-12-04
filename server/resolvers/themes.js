const { ApolloError } = require('apollo-server')
const User = require('../models/User')

module.exports = {
  Query: {
    getThemes: async (_, { id }) => {
      try {
        const foundUser = await User.findOne({ id: id })
        if (foundUser) {
          return foundUser.themes
        } else {
          throw new ApolloError('No user with this id found in the DB')
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
  },
  Mutation: {
    createTheme: async (_, { id, themeName }) => {
      try {
        const newTheme = { name: themeName, id: Date.now().toString() }
        await User.updateOne({ id: id }, { $push: { themes: newTheme } })
        return newTheme
      } catch (e) { throw new ApolloError(e.message) }
    },
    deleteTheme: async (_, { id, themeId }) => {
      try {
        await User.updateOne({ id: id }, { $pull: { themes: { id: themeId } } })
        return themeId
      } catch (e) { throw new ApolloError(e.message) }
    },
    editThemeName: async (_, { id, themeId, newName }) => {
      try {
        await User.updateOne({ id: id, 'themes.id': themeId }, { $set: { "themes.$.name": newName } })
        const res = await User.findOne({ id: id, themes: { $elemMatch: { id: themeId } } }, { 'themes.$.id': themeId })
        return {
          name: res.themes[0].name,
          id: res.themes[0].id
        }
      } catch (e) { throw new ApolloError(e.message) }
    },
  }
}