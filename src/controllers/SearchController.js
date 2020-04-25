const Sequelize = require('sequelize');
// const { Op } = require('sequelize');
const Shop = require('../models/Shop');

class SearchController {
  async getAll(req, res) {
    const { latitude, longitude } = req.query;

    const shops = await Shop.findAll({
      attributes: {
        exclude: ['password'],
        include: [
          [
            Sequelize.fn(
              'ST_DistanceSphere',
              Sequelize.fn('ST_MakePoint', latitude, longitude),
              Sequelize.col('coordinates')
            ),
            'coordinates',
          ],
        ],
      },
      where: Sequelize.where(
        Sequelize.fn(
          'ST_DistanceSphere',
          Sequelize.fn('ST_MakePoint', latitude, longitude),
          Sequelize.col('coordinates')
        ),
        '<=',
        1000
      ),
    });

    return res
      .status(200)
      .json({ success: true, message: 'list of shops', shops });
  }
}

module.exports = new SearchController();
