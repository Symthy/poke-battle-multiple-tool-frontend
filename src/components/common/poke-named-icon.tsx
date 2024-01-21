import Image from "next/image";
import { useFetchPokeNameImage } from "@/hooks/poke/useFetchPokeNameImage";
import { PokemonId } from "@/types/compatibility";
import { IconButton } from "@radix-ui/themes";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  pokemonId: PokemonId;
};

export const PokeNamedIcon = ({ pokemonId }: Props) => {
  return (
    <IconButton variant="soft" style={{ height: 60 }}>
      <Suspense
        fallback={
          <div style={{ width: 50, height: 50 }}>
            <Skeleton />
          </div>
        }
      >
        <InnerPokeNamedIcon pokemonId={pokemonId} />
      </Suspense>
    </IconButton>
  );
};

const InnerPokeNamedIcon = async ({ pokemonId }: Props) => {
  const { name, imageUrl } = await useFetchPokeNameImage(pokemonId);
  return <Image src={imageUrl} alt={name} width={50} height={50} />;
};
