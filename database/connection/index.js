const pgp = require( 'pg-promise' )();

// Make use of environment variables defined in .env
if( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production' ) {
  require( "dotenv" ).config();
}

const connection = pgp( process.env.DATABASE_URL );
module.exports = connection;