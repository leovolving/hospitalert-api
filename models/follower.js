'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Follower = sequelize.define('Follower', {}, {
  tableName: 'followers',
  underscored: true
});

Follower.associate = function(models) {
  Follower.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
  Follower.belongsTo(models.User, {
    as: 'follower',
    foreignKey: {
      allowNull: false
    },
    onDelete: 'CASCADE'
  });
};

Follower.prototype.apiRepr = function() {
  return {
    id: this.id,
    user_id: this.user_id,
    follower_id: this.follower_id
  };
};

module.exports = {Follower};
