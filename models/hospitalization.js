'use strict';

const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Hospitalization = sequelize.define('Hospitalization', {
  patient: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  condition: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  conscious: {
    type: Sequelize.BOOLEAN
  },
  latestUpdate: {
    type: Sequelize.TEXT,
    field: 'latest_update'
  },
  isAForm: {
    type: Sequelize.BOOLEAN,
    field: 'is_a_form'
  }
},
{
  tableName: 'hospitalizations',
  underscored: true,
  classMethods: {
    associate: function(models) {
      Hospitalization.belongsTo(models.User, {
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
        patient: this.patient,
        condition: this.condition,
        conscious: this.conscious,
        latestUpdate: this.latestUpdate,
        isAForm: this.isAForm
      };
    }
  }
});

module.exports = {Hospitalization};