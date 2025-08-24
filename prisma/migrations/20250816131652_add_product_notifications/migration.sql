-- Function to notify when a product is added, updated, or deleted
CREATE OR REPLACE FUNCTION notify_product_changes()
RETURNS TRIGGER AS $$
DECLARE
    payload JSON;
BEGIN
    -- Determine the operation and set the payload
    IF (TG_OP = 'DELETE') THEN
        payload := json_build_object('id', OLD.id, 'operation', 'DELETE');
    ELSIF (TG_OP = 'INSERT') THEN
        payload := json_build_object('id', NEW.id, 'operation', 'INSERT');
    ELSIF (TG_OP = 'UPDATE') THEN
        payload := json_build_object('id', NEW.id, 'operation', 'UPDATE');
    END IF;

    -- Send the notification with the JSON payload
    PERFORM pg_notify('product_updates', payload::text);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to fire the function after changes to the products table
CREATE TRIGGER product_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON product
FOR EACH ROW
EXECUTE FUNCTION notify_product_changes();
-- DropColumn
-- ALTER TABLE "public"."cart_item" DROP COLUMN "productID";