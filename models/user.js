'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const User = sequelize.define('User', {
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fbId: {
    type: Sequelize.TEXT,
    field: 'fb_id'
  }
},
{
  tableName: 'users',
  underscored: true,
  classMethods: {
    associate: function(models) {
      User.hasMany(models.Hospitalization, {
        as: 'hospitalizations',
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      }),
      User.hasMany(models.Friend, {
        as: 'friends',
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }
  },
  instanceMethods: {
    apiRepr: function() {
      return {
        id: this.id,
        email: this.email,
        name: this.name
      };
    }
  }
});

module.exports = {User};