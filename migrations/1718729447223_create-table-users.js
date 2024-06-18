/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      notNull: true,
    },
    auth_id: {
      type: 'uuid',
      notNull: true,
      references: 'auths',
    },
    username: {
      type: 'text',
      notNull: true,
      unique: true,
      onDelete: 'CASCADE',
    },
    email: {
      type: 'text',
      notNull: true,
      unique: true,
      onDelete: 'CASCADE',
    },
    profile_img: {
      type: 'text',
      unique: true,
      notNull: true,
    },
    created_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    is_deleted: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
};
