import Title from "../../Title/Title";
import MembersList from "../MembersList";
import s from "./nosotros.module.css";

const textoParaMostrar = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, eos incidunt
quisquam ratione iste autem
molestiae neque sequi tempora accusamus, eum ipsum distinctio delectus inventore sed sint.Ex, id temporibus.
Aperiam aspernatur et recusandae, qui voluptates modi eveniet pariatur esse repellendus reprehenderit nihil.
Culpa natus harum ea blanditiis laboriosam dolores in, reprehenderit, ex esse voluptatem qui! Voluptatem sed
consequatur asperiores.`;

const img =
  "https://www.elpaisano.pe/wp-content/uploads/2021/09/Programa-Mi-Juntos-1.jpg";

const Nosotros = () => {
  return (
    <>
      <header>
        <Title title="Sobre Nosotros" image={img} />
      </header>
      <main>
        <h3 className={s["title_sobre_nosotros"]}>
          Les presentamos a Nuestro equipo!
        </h3>
        <MembersList />
        <h3 className={s["title_sobre_nosotros"]}>Nuestra historia</h3>
        <p className={s["sobre_nosotros"]}>{textoParaMostrar}</p>
      </main>
    </>
  );
};

export default Nosotros;
