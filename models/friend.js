'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Friend = sequelize.define('Friend', {
  status: {
    type: Sequelize.TEXT,
    allowNull: false
  }
},
{
  tableName: 'friends',
  underscored: true
});

Friend.associate = function(models) {
  Friend.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
  Friend.belongsTo(models.User, {
    as: 'friend',
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
};

Friend.prototype.apiRepr = function() {
  return {
    id: this.id,
    user_id: this.user_id,
    friend_id: this.friend_id,
    status: this.status
  };
};

module.exports = {Friend};