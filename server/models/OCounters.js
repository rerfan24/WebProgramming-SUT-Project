module.exports = (sequelize, DataTypes) => {
    const OCounters = sequelize.define("OCounters", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hour: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        minute: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        second: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return OCounters;
}