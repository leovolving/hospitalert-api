'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Friend = sequelize.define('Friend', {},{
  tableName: 'friends',
  underscored: true,
  classMethods: {
    associate: function(models) {
      Friend.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
      Friend.belongsTo(models.User, {
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
        user_id: this.user_id,
        friend_id: this.friend_id
      };
    }
  }
});

module.exports = {Friend};