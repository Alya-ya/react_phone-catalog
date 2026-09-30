//import styles from './TechSpecs.module.scss';

type TechSpec = {
  title: string;
  value: string;
};

type TechSpecsProps = {
  specs: TechSpec[];
};

export const TechSpecs = ({ specs }: TechSpecsProps) => {
  return (
    <section>
      <h3>Tech specs</h3>

      <div>
        {specs.map(spec => (
          <div key={spec.title}>
            <h4>{spec.title}</h4>
            <p>{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
