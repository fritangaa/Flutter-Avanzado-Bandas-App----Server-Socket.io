const {io} = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band("Heroes del silencio"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Bon Jovi"));

//console.log(bands);

// Mensajes de sockets 
io.on('connection', client => {

    console.log("Cliente conectado");

    client.emit("active-bands", bands.getBands() );


    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });


    client.on("vote-band", ( payload ) => {
        //console.log("id de la banda: ", payload);
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands() );
    });

    client.on("add-band", ( payload ) => {
        //console.log("id de la banda: ", payload);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit("active-bands", bands.getBands() );
    });

    client.on("delete-band", ( payload ) => {
        //console.log("id de la banda: ", payload);
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands() );
    });

});

