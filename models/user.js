'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const User = sequelize.define('User', {
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fbId: {
    type: Sequelize.TEXT,
    field: 'fb_id'
  },
  profilePicture: {
    type: Sequelize.TEXT,
    field: 'profile_picture'
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    field: 'is_logged_in',
    defaultValue: false
  }
},
{
  tableName: 'users',
  underscored: true,
});

User.associate = function(models) {
  User.hasMany(models.Hospitalization, {
    as: 'hospitalizations',
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  }),
  User.hasMany(models.Follower, {
    as: 'followers',
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
};

User.prototype.fbRepr = function() {
  return {
    id: this.id,
    name: this.name,
    profilePicture: this.profilePicture
  };
};

User.prototype.apiRepr = function() {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    isLoggedIn: this.isLoggedIn
  };
};

module.exports = {User};