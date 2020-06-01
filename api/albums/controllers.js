const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM albums`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      res.json(rows)
    });

  },
  getOne: (req, res) => {

    const id = req.params.id;
    const sql = `SELECT * FROM albums where albumid=${Number(id)}`;

    db.all(sql, (err, rows) => {
      if (err) {

        res.status(400).json({ "error": err.message });
        return;
      }

      res.json(rows)
    });

  },
  create: (req, res) => {
    // read row data from body
    const newAlbumString = JSON.stringify(req.body);
    // console.log(req.body);
    const newAlbum = JSON.parse(newAlbumString.toLocaleLowerCase());

    console.log(newAlbum);
    const sql = `INSERT INTO albums (
                       Title,
                       ArtistId
                   )values("${newAlbum.title}",${newAlbum.artistid})`;

    db.run(sql, function (err) {
      if (err) {

        res.status(400).json({ "error": err.message });
        return; a
      }
      //return the last id if the table 
      res.json({ lastID: this.lastID });
    });

  },
  update: (req, res) => {
    // read row data from body
    const newAlbumString = JSON.stringify(req.body);
    // console.log(req.body);
    const newAlbum = JSON.parse(newAlbumString.toLocaleLowerCase());
    const sql = `UPDATE albums
    SET 
     Title = "${newAlbum.title}",
      ArtistId = ${newAlbum.artistid}
    WHERE AlbumId = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      //return the last id if the table 
      res.json({ changes: this.changes });
    });


  },
  delete: (req, res) => {

    const sql = `DELETE FROM albums
      WHERE AlbumId = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      res.json({ deleted: this.changes });
    });

  }
}
module.exports = controllers;
