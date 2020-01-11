import * as React from 'react';
import * as styles from './styles.scss';

interface IProps {
  compiler: string;
  framework: string;
  bundler: string;
}

/**
 * Some test component
 *
 * @param framework string
 * @param compiler string
 * @param bundler string
 */
export const Hello = ({ framework, compiler, bundler }: IProps) => {
  return (
    <div className={styles.test}>
      <h2>
        This is a {framework} application using {compiler} with {bundler}
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente
        rem ea deserunt, quia dolor quasi modi corporis voluptatibus fugiat
        reiciendis ut culpa magni eaque vitae quibusdam dolore quas placeat?
      </p>
    </div>
  );
};
