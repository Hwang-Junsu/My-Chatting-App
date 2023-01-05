import ListItem from "../../components/chatlist/item";
import Layout from "../../components/layout";

export default function Chatting() {
    return (
        <>
            <Layout text="Chat" hasTabBar={false}>
                <div className="p-5">
                    <section>
                        <div className="font-bold text-lg">Chatting</div>
                        <div className=" divide-y-2">
                            {[1, 2, 3, 4, 5].map((el) => (
                                <ListItem key={el} displayName={String(el)} />
                            ))}
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
