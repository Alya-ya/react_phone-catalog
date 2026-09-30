//import styles from './ProductAbout.module.scss';

type ProductDescription = {
  title: string;
  text: string[];
};

type ProductAboutProps = {
  description: ProductDescription[];
};
export const ProductAbout = ({ description }: ProductAboutProps) => {
  return (
    <section>
      <h3>About</h3>

      <div>
        {description.map(section => (
          <div key={section.title}>
            <h4>{section.title}</h4>

            {section.text.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
