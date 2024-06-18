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
  pgm.createTable('auths', {
    id: {
      type: 'uuid',
      primaryKey: true,
      unique: true,
      notNull: true,
      default: pgm.func('gen_random_uuid()'),
      onDelete: 'CASCADE',
    },
    identifier: {
      type: 'string',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'string',
      notNull: true,
    },
    is_deleted: {
      type: 'boolean',
      notNull: true,
      default: false,
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
  });
  pgm.addConstraint(
    'auths',
    'unique_auths.id__auths.identifier',
    'UNIQUE(id, identifier)',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('auths', 'unique_auths.id__auths.identifier');
  pgm.dropTable('auths');
};
